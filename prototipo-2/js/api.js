const api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/'
});

//total de uma funcionalidade
async function getTotalByFeature(feature) {

    try {
        const result = await api.get(`/${feature}`);

        return result.data.info.count;
    } catch (error) {
        console.log(error)
    }
}

//listagem dos personagens de acordo com a pagina selecionada
async function listCharacterByPage(page = 1) {
    try {
        const result = await api.get("/character", {
            params: { page },
        });

        return {
            nextPage: result.data.info.next,
            prevPage: result.data.info.prev,
            charactersList: result.data.results,
        }
    } catch (error) {
        console.log(error)
    }
}

//buscar nome de episodio usando URL
async function getEpisodeDataFromURL(url) {
    try {
        const result = await api.get(url);
        return result.data.name
    } catch (error) {
        console.log(error)
    }
}

//Buscar dados de um personagem por ID

async function getCharacterById(characterId) {
    try {
        const result = await api.get(`/character/${characterId}`);

        return result.data;
    } catch (error) {
        console.log(error);
    }
}
