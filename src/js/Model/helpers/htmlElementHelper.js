/* eslint-disable class-methods-use-this */
export default class HtmlElementService {

createButton(type, innerHTML, click) {
    const button = document.createElement('button');
    button.type = type;
    button.innerHTML = innerHTML;
    button.addEventListener('click', click);
    if (type === 'submit' || type === 'reset') {
        button.className += 'change-lang__button';
    }
    return button;
}

createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className);
    return element
}

createLabel(labelText) {
    const label = document.createElement('label');
    label.innerHTML = labelText;
    return label;
}

createInput(type, id, required) {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.required = required;
    return input;
}

createForm(submitEvent) {
    const form = document.createElement('form');
    form.addEventListener('submit', submitEvent);
    form.addEventListener('submit', (e) => e.preventDefault());
    return form;
    }
}
