const body = document.getElementsByTagName('body')[0];
function layout(userCity) {
    const cityItem = document.createElement('div');
    cityItem.setAttribute('id', 'cityItem');
    cityItem.innerHTML = userCity;
    body.appendChild(cityItem);
}
export default layout();