class BackgroundImageService {
    constructor() {
        this.locationData = {};
    }

    async getBackgroundImage(option) {
        const response = await fetch((`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=weather,${option}&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17`), {
            method: 'GET',
            mode: 'cors'
        });
        const data = await response.json()
        // data.headers.set("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
        this.locationData = data;
        return data;
    }
}
export default BackgroundImageService;