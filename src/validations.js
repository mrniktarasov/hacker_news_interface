export default function validateAPI(response) {
    if(!response.kids) {
        response.kids = [];
    }
    if(!response.id) {
        response.id = getRandomInt(1000)
    }
    return response;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
