class ImageContainer {
    imageUrl = ''
    heading = ''
    text = ''
    constructor(heading, text) {
        this.createImage();
        this.createContainer();
        this.getImage();
        this.bottomDescription(heading, text);
        // this.startModalImage();
        // this.createModalImageContainer();
    }

    createImage() {
        this.imgElement = document.createElement("img");
        this.imgElement.className = "img";
    }

    createContainer() {
        this.container = document.createElement("div");
        this.container.className = "container";
        this.container.addEventListener("click", this.clickOnContainer.bind(this));
    }

    getImage() {
        fetch('https://dog.ceo/api/breeds/image/random') // -- returneaza o promisiune
            .then((response) => {
                return response.json(); // returneaza o promisiune
            })
            .then((myJson) => { // aici primim raspunsul de la server {message:'', status:''}
                this.displayImage(myJson);
            });
    }

    displayImage(data) {
        this.imgElement.setAttribute("src", data.message);
        this.container.appendChild(this.imgElement);
        this.imageUrl = data.message;
    }

    bottomDescription(heading, text) {
        this.heading = heading
        this.text = text
        this.bottomDiv = document.createElement("div");
        this.bottomDiv.className = "bottom-description";

        this.headingElement = document.createElement("h1");
        this.headingElement.innerText = heading;
        this.headingElement.className = "heading";

        this.textElement = document.createElement("span");
        this.textElement.innerText = text;
        this.textElement.className = "text";

        this.bottomDiv.appendChild(this.headingElement);
        this.bottomDiv.appendChild(this.textElement);
        this.container.appendChild(this.bottomDiv);
    }

    createModalImageContainer() {
        this.modalImageContainer = document.createElement("div");
        this.modalImageContainer.className = "container-modal-image";
        var imageElement = document.createElement("img");
        imageElement.className = "img-modal";
        imageElement.setAttribute("src", this.imageUrl);

        this.modalImageContainer.appendChild(imageElement);

        var bottomDiv = document.createElement("div");
        bottomDiv.className = "bottom-description-modal";

        this.modalImageContainer.appendChild(bottomDiv);

        var headingElement = document.createElement("h1");
        headingElement.innerText = this.heading;
        headingElement.className = "heading-modal";

        bottomDiv.appendChild(headingElement);

        var textElement = document.createElement("span");
        textElement.innerText = this.text;
        textElement.className = "text-modal";
        bottomDiv.appendChild(textElement);

        var closeButton = document.createElement("div");
        closeButton.className = "close-button";
        closeButton.innerText = "X";

        this.modalImageContainer.appendChild(closeButton);

        closeButton.addEventListener('click', this.closeModalImage.bind(this));
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    onKeyDown(e) {
        if (e.keyCode == 27) {
            this.closeModalImage()
        }
    }

    clickOnContainer() {
        this.createModalImageContainer()
        document.body.appendChild(this.modalImageContainer)
    }

    closeModalImage() {
        this.modalImageContainer.remove()
    }
}