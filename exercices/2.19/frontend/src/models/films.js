const readAllFilms = async () => {
    try{
        const reponse = await fetch('/api/films');
        const films = await reponse.json();
        return films;
    } catch (err){
        console.error('readAllMovies::error: ', err);
        throw err;
    }
};

const addOneMovie = async (movie) => {
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'Application/json',
            },
        };

        const reponse = await fetch('/api/films', options);

        const createdFilm = await reponse.json();

        return createdFilm;
    } catch (error) {
        console.error('addOneMovie::error: ', error);
        throw error;
    }
}

const deleteOneMovie = async (id) => {
    try {
        const options = {
            method: 'DELETE',
        }
        const reponse = await fetch(`/api/films/${id}`, options);

        const deletedMovie = await reponse.json();
        return deletedMovie;
    } catch (error) {
        console.error('addOneMovie::error: ', error);
        throw error;
    }
}

export { readAllFilms, addOneMovie, deleteOneMovie };