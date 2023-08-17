

export function isAuthorized() {

    const token = localStorage.getItem("token");

    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTimestamp = Date.now() / 1000;

        //return decodedToken.exp < currentTimestamp;

        if (decodedToken.exp > currentTimestamp) {
            //console.log("token not expired.");
            return true;

        } else {
            //console.log("token expired.");
            return false;
        }


    } catch (error) {
        console.log(error);
        //return true; // Invalid token format
    }
}