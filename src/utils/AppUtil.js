
const AppUtil = {
    getUsers : async function(page,limit) {
        return fetch("https://randomuser.me/api/?page="+page+"&results="+limit, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
    }
}

export default AppUtil;
