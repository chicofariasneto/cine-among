import contextDomain from "../domain/contextDomain";
import Gender from "../domain/gender/model/gender";
import Movie from "../domain/movie/model/movie";
import logger from "../core/utils/logging";

export interface AddMovieRequest {
  name: string;
  year: string;
  trailer: string;
  gender: string;
}

export const handler = async (request: AddMovieRequest): Promise<Movie> => {
  try {
    const genderService = contextDomain.getGenderService();
    const movieService = contextDomain.getMovieService();

    let gender = await genderService.getGenderByName(request.gender);

    if (gender === null) {
      gender = new Gender(request.gender);
      await genderService.addGender(gender);
    }

    const movie = new Movie();
    movie.name = request.name;
    movie.year = request.year;
    movie.trailer = request.trailer;
    movie.gender = gender;

    await movieService.addMovie(movie);

    logger.info(`Movie ${movie.name} has been added.`);

    return movie;
  } catch (e: unknown) {
    logger.error(`Error ${e}`);
    throw e;
  }
}
