/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line no-undef
class KgutsV2 extends FileFolderManagement {
	constructor(baseUrl, fileFolderInput, btnFileLocator, btnParseToText, btnParseToJson, divParentReport) {
		super(baseUrl, fileFolderInput);
		this.btnFileLocator = btnFileLocator;
		this.btnParseToText = btnParseToText;
		this.btnParseToJson = btnParseToJson;
		this.divParentReport = divParentReport;

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
		if (content.status === 200) {
			this.setEmptyFolderList();
			this.onInitSetFolderList();
		}

		this.bodyEnabled();
	};

	onChangeFileFolder = async () => {
		const content = await this.fileFolderStatus();

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

	onClickParseToText = async () => {
		this.spinnerStart();

		const fileOrFolderPath = this.fileFolderInput.value;
		const inputJson = {
			jsonString: {
				tool: 'KGUTSV2',
				fileOrFolderPath: fileOrFolderPath
			}
		};

		const rawResponse = await fetch(`${this.baseUrl}/toolv2/runscript`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(inputJson)
		});

		const result = await rawResponse.json();

		// print to web
		this.clearDivParentReport();
		const jsonResult = JSON.parse(result);

		const html = `
		${jsonResult.html}
    <hr>
    <div>Time-span: ${jsonResult.timeSpan}</div>
    <div>Error-message: <span class="text-danger">${jsonResult.resultMessage}</span></div>
		`;
		this.divParentReport.insertAdjacentHTML('afterBegin', html);

		this.spinnerStop();
	};

	onClickParseToJson = () => {
		// print to web
		this.clearDivParentReport();

		const html = `
		<div class="text-primary">Tool is under development.</div>
    <hr>
    <div>time-span: 00h:00m:00s:001ms</div>
    <div>error-message: <span class="text-danger">Please wait for further notification!.</span></div>
		`;

		this.divParentReport.insertAdjacentHTML('afterBegin', html);
	};

	clearDivParentReport = () => {
		this.divParentReport.innerHTML = '';
	};
}

const btnFileLocator = document.querySelector('#file-locator');
const baseUrl = document.querySelector('#base-url');
const divParentReport = document.querySelector('#kguts-cardbody-report');
const modumpFolderSelection = document.querySelector('#kgutsv2-modump-folder');
const btnParseToText = document.querySelector('#kgutsv2-parse-text');
const btnParseToJson = document.querySelector('#kgutsv2-parse-json');

const kgutsv2 = new KgutsV2(
	baseUrl,
	modumpFolderSelection,
	btnFileLocator,
	btnParseToText,
	btnParseToJson,
	divParentReport
);
