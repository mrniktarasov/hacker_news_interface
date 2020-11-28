export default function validateAPI(response) {
    if(!response.kids) {
        response.kids = [];
    }
    return response;
}
