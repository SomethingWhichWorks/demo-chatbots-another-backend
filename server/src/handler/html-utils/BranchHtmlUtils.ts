export class BranchHtmlUtils {

    static buildResponse(channel: string, beneficiaries: any) {
        switch (channel) {
            case "web":
                return BranchHtmlUtils.buildResponseForWebChannel(beneficiaries);
            case "mobile":
                return BranchHtmlUtils.buildResponseForOtherChannels(beneficiaries);
            default:
                return BranchHtmlUtils.buildResponseForOtherChannels(beneficiaries);
        }
    }


	static buildResponseForWebChannel = (branchObject: any) => {
		let branchId: string;
		let branchAddress: string;
		let ifscCode: string;
		let bicCode: string;
		branchId = branchObject.branchId || '';
		branchAddress = branchObject.branchAddress || '';
		ifscCode = branchObject.ifscCode || '';
		bicCode = branchObject.bicCode || '';
		return '<div>' +
			'<div><strong>Branch ID: ' + branchId + '</strong></div>' +
			'<div>Branch Address: ' + branchAddress + '</div>' +
			'<div>Branch IFSCCode: ' + ifscCode + '</div>' +
			'<div>Branch bicCode: ' + bicCode + '</div>' +
			'</div><br>'
	}

    static buildResponseForOtherChannels = (branchObject: any) => {
		let branchId: string;
		let branchAddress: string;
		let ifscCode: string;
		let bicCode: string;
		branchId = branchObject.branchId || '';
		branchAddress = branchObject.branchAddress || '';
		ifscCode = branchObject.ifscCode || '';
		bicCode = branchObject.bicCode || '';
		return 'Branch ID: ' + branchId + '\n' +
			'Branch Address: ' + branchAddress + '\n' +
			'Branch IFSCCode: ' + ifscCode +'\n' +
			'Branch bicCode: ' + bicCode + '\n';
			
	}
}