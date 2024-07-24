import Movie from '../../domain/movie/model/movie';

export const createMessageMovies = (movies: Array<Movie>): Array<string> => {
  let listMessages: Array<string> = [];
  listMessages.push('@here **CINE AMONG**\n**Lista de Filmes:**\n');
  let count = 1;
  for (const movie of movies) {
    let title = `**${count++} - ${movie.title}**\n`;
    let description = `**Descrição:** ${movie.overview}\n`;
    let vote = `**Nota TMDB:** ${movie.voteAverage}\n`;

    listMessages.push(
      `${title}${movie.overview && movie.overview !== '' ? description : ''}${vote}${movie.teaser}\n\n`
    );
  }

  return listMessages;
};
