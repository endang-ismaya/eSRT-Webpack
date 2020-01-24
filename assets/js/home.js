class Home {
	constructor(baseUrl, parentElement, smallElement, homeVersion) {
		this.baseUrl = baseUrl.value;
		this.parentElement = parentElement;
		this.smallElement = smallElement;
		this.homeVersion = homeVersion;

		this.checkAllVersion();
	}

	checkAllVersion = async () => {
		const rawResponse = await fetch(`${this.baseUrl}toolv2/getallversions`);
		const contents = await rawResponse.json();

		const { local, server, link } = contents;
		const iLocal = Number(local.toString().replace(/\./g, ''));
		const iServer = Number(server);
		const serverVersion = server.split('').join('.');

		if (iServer > iLocal) {
			const info1 = `New eSRT-webPack v${serverVersion} is live! `;
			const info2 = `Please download the latest release <a href="${link}" class="alert-link" target="_blank">here.</a>`;
			const newAlert = this.getNewVersionAlert(info1, info2);

			this.parentElement.insertAdjacentHTML('beforebegin', newAlert);
		}

		this.smallElement.innerHTML = `<small>v</small>${local}`;

		if (this.homeVersion) {
			this.homeVersion.innerHTML = `<small>v</small>${local}`;
		}
	};

	getNewVersionAlert = (strongMessage, otherMessage) => {
		return `
    <div id="filefolder-alert" class="alert alert-light alert-dismissible fade show m-1 text-center" role="alert">
        <strong>${strongMessage}</strong> ${otherMessage}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;
	};
}

const baseUrlHome = document.querySelector('#base-url');
const parentElement = document.querySelector('nav');
const smallElement = document.querySelector('#small-version');
const homeVersion = document.querySelector('#home-version');
const home = new Home(baseUrlHome, parentElement, smallElement, homeVersion);
