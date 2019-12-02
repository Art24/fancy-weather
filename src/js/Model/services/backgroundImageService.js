class BackgroundImageService {
    constructor() {
        this.locationData = {};
    }

    async getBackgroundImage(option) {
        const response = await fetch((`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${option}&client_id=0eca6307463dee5325a2ae91a9da38db508f782489581ce710b85697aad07d09`), {
            method: 'GET',
            mode: 'cors'
        });
        const data = await response.json()
        //data.headers.set("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
        this.locationData = data;
        console.log(data);
        return data;
    }
}
export default BackgroundImageService;