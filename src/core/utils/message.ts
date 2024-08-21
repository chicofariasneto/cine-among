import Movie from '../../domain/movie/model/movie';

export const createMessageMovies = (movies: Array<Movie>): Array<string> => {
  const listMessages: Array<string> = [];
  listMessages.push('@here **CINE AMONG**\n**Lista de Filmes:**\n');
  let count = 1;
  for (const movie of movies) {
    const title = `**${count++} - ${movie.title}**\n`;
    const description = `**Descrição:** ${movie.overview}\n`;
    const vote = `**Nota TMDB:** ${movie.voteAverage}\n`;

    listMessages.push(
      `${title}${movie.overview && movie.overview !== '' ? description : ''}${vote}${movie.teaser}\n\n`
    );
  }

  return listMessages;
};
