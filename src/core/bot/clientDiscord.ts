import {Client, PollAnswerData, TextChannel} from 'discord.js';
import PollService from '../../domain/poll/service/pollService';
import contextDomain from '../../domain/contextDomain';
import Poll from '../../domain/poll/model/poll';
import Genre from '../../domain/genre/model/genre';
import GenreService from '../../domain/genre/service/genreService';
import MovieService from '../../domain/movie/service/movieService';
import Movie from '../../domain/movie/model/movie';

export default class ClientDiscord {
  constructor(channel: string, token: string) {
    this.channel = channel;
    this.token = token;
    this.client = new Client({
      intents: [
        'Guilds',
        'GuildMembers',
        'GuildMessages',
        'MessageContent',
        'GuildMessagePolls',
      ],
    });

    this.pollService = contextDomain.getPollService();
    this.genreService = contextDomain.getGenreService();
    this.movieService = contextDomain.getMovieService();
  }

  private client: Client;

  private channel: string;

  private token: string;

  private pollService: PollService;

  private genreService: GenreService;

  private movieService: MovieService;

  async createPoll(
    messages: Array<string>,
    question: string,
    answers: Array<PollAnswerData>,
    genre: Genre
  ): Promise<void> {
    await this.client.login(this.token);

    this.client.on('ready', async () => {
      const channel: TextChannel = <TextChannel>(
        await this.client.channels.fetch(this.channel)
      );

      for (const message of messages) {
        await channel.send(message);
      }

      const messagePoll = await channel.send({
        poll: {
          question: {text: question},
          answers: answers,
          duration: 12,
          allowMultiselect: false,
        },
      });

      await channel.send({
        poll: {
          question: {text: 'Com qual áudio você gostaria de assistir o filme?'},
          answers: [{text: 'Dublado'}, {text: 'Original'}],
          duration: 12,
          allowMultiselect: false,
        },
      });

      const poll = new Poll(`${messagePoll.id}`, genre);
      await this.pollService.addPoll(poll);

      await this.client.destroy();
    });
  }

  async finishPoll(): Promise<void> {
    const poll = await this.pollService.getCurrentPoll();
    poll.active = false;

    await this.client.login(this.token);

    this.client.on('ready', async () => {
      const channel: TextChannel = <TextChannel>(
        await this.client.channels.fetch(this.channel)
      );
      const messagePoll = await channel.messages.fetch(poll.id);

      let maxVotes = -1;
      let movieTitle = '';
      const answersPoll = messagePoll?.poll?.answers;
      answersPoll?.forEach(movie => {
        if (movie.voteCount > maxVotes) {
          maxVotes = movie.voteCount;
          movieTitle = movie.text || '';
        }
      });

      const genre = await this.genreService.getNextGenre();
      genre.count = genre.count + 1;

      const [id, title] = movieTitle.split(' - ');
      const movie = Movie.initialize({
        id,
        title,
      });
      movie.poll = poll;

      await this.genreService.updateCountGenre(genre);
      await this.movieService.addMovie(movie);
      await this.pollService.finishPoll(poll);

      let fetched;
      do {
        fetched = await channel.messages.fetch({limit: 50});
        await channel.bulkDelete(fetched);
      } while (fetched.size >= 2);

      await channel.send(`**Filme da Noite**: ${title}`);

      await this.client.destroy();
    });
  }
}
