import {handler} from './usecases/randomMovies';
import * as fs from "fs";

handler().then((result) => {
  fs.writeFileSync('test.json', JSON.stringify(result));
});

import { AddMovieRequest, handler } from "./usecases/registerCine";

const request = {
  movie: {
    id: '1022789',
    title: 'Inside Out 2'
  },
  genreId: 16
} as AddMovieRequest;

handler(request).then(console.log);
