class FileFolderManagement {
	constructor(baseUrlInput, fileFolderInput) {
		this.baseUrlInput = baseUrlInput;
		this.fileFolderInput = fileFolderInput;
		this.body = document.querySelector('body');
		this.mainShow = document.querySelector('#main-show');
		this.mainShow.style.display = 'none';
		this.content = {};
	}

	onInitSetFolderList = async () => {
		const content = await this.getFolderList();
		let options = `<option value=''>--Select Folder--</option>`;
		for (const option of content) {
			options += `<option value=${option}>${option}</option>`;
		}

		this.fileFolderInput.insertAdjacentHTML('afterbegin', options);
	};

	setEmptyFolderList = () => {
		this.fileFolderInput.innerHTML = '';
	};

	spinnerStart = () => {
		this.body.classList.add('bodyProcess');
		this.body.classList.add('disabled-button');
		this.mainShow.style.display = 'block';
	};

	bodyDisabled = () => {
		this.body.classList.add('bodyProcess');
		this.body.classList.add('disabled-button');
	};

	bodyEnabled = () => {
		this.body.classList.remove('bodyProcess');
		this.body.classList.remove('disabled-button');
	};

	spinnerStop = () => {
		this.body.classList.remove('bodyProcess');
		this.body.classList.remove('disabled-button');
		this.mainShow.style.display = 'none';
	};

	getFolderList = async () => {
		const rawResponse = await fetch(`${this.baseUrl}/toolv2/getfolderlist`);
		return await rawResponse.json();
	};

	fileFolderStatus = async () => {
		const fileOrFolderPath = this.fileFolderInput.value;

		const rawResponse = await fetch(`${this.baseUrl}/toolv2/isfilefolderexists`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ fileOrFolderPath })
		});
		return await rawResponse.json();
	};

	get baseUrl() {
		return this.baseUrlInput.value;
	}

	fileFolderAlertMessage = (strongMessage, otherMessage) => {
		return `
    <div id="filefolder-alert" class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>${strongMessage}</strong> ${otherMessage}.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;
	};
}
