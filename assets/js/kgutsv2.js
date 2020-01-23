class KgutsV2 extends FileFolderManagement {
	constructor(baseUrl, fileFolderInput, btnFileLocator, btnParseToText, btnParseToJson) {
		super(baseUrl, fileFolderInput);
		this.btnFileLocator = btnFileLocator;
		this.btnParseToText = btnParseToText;
		this.btnParseToJson = btnParseToJson;

		this.setButtonsDisabled([this.btnParseToText, this.btnParseToJson]);
		this.btnFileLocator.addEventListener('click', this.onClickFileFolderLocator);
		this.btnParseToText.addEventListener('click', this.onClickParseToText);
		this.btnParseToJson.addEventListener('click', this.onClickParseToJson);
		this.fileFolderInput.addEventListener('change', this.onChangeFileFolder);

		this.onInitSetFolderList();
	}

	onClickFileFolderLocator = async () => {
		this.bodyDisabled();

		const content = await fetch(`${this.baseUrl}/filelocator`);
		console.log(content.status);
		if (content.status === 200) {
			this.setEmptyFolderList();
			this.onInitSetFolderList();
		}

		this.bodyEnabled();
	};

	onChangeFileFolder = async () => {
		const content = await this.fileFolderStatus();
		console.log(content);

		if (!content.isExists) {
			const container = document.querySelector('#card-1');
			container.insertAdjacentHTML(
				'beforebegin',
				this.fileFolderAlertMessage(
					'File or Folder does not exists!',
					`You should select a valid path on <span class="text-primary font-italic">'MODUMP FOLDER'</span>`
				)
			);
			this.setButtonsDisabled([this.btnParseToText, this.btnParseToJson]);
		} else {
			this.setButtonsEnabled([this.btnParseToText, this.btnParseToJson]);
		}
	};

	setButtonsDisabled = btnList => {
		for (const btn of btnList) {
			btn.disabled = true;
			btn.classList.remove('btn-success');
			btn.classList.add('not-allowed');
			btn.classList.add('btn-secondary');
		}
	};

	setButtonsEnabled = btnList => {
		for (const btn of btnList) {
			btn.disabled = false;
			btn.classList.add('btn-success');
			btn.classList.remove('not-allowed');
			btn.classList.remove('btn-secondary');
		}
	};

	onClickParseToText = () => {
		console.log(`parse to text`);
	};

	onClickParseToJson = () => {
		console.log(`parse to json`);
	};
}

const btnFileLocator = document.querySelector('#file-locator');
const baseUrl = document.querySelector('#base-url');
const modumpFolderSelection = document.querySelector('#kgutsv2-modump-folder');
const btnParseToText = document.querySelector('#kgutsv2-parse-text');
const btnParseToJson = document.querySelector('#kgutsv2-parse-json');

const kgutsv2 = new KgutsV2(baseUrl, modumpFolderSelection, btnFileLocator, btnParseToText, btnParseToJson);
