// TBD
const request = require('request-promise');

const prc = process;
const auth = prc.argv[2] ? prc.argv[2] : (prc.env.AUTH?prc.env.AUTH:'');
const url = 'https://api.uat.pe.researchnow.com/sample/v1/projects';

const surveyUrl = 'www.mysurvey.com/live/survey?pid='+
'<#DubKnowledge[1500/Entity id]>&'+
'k2=<#Project[Secure Key 2]>&'+
'psid=<#IdParameter[Value]>';
const surveyUrlTest = 'www.mysurvey.com/test/survey?pid='+
'<#DubKnowledge[1500/Entity id]>&'+
'k2=<#Project[Secure Key 2]>&'+
'psid=<#IdParameter[Value]>';

const endlinkOne = 'https://api.researchnow.com/respondent/'+
			'exit?rst=1&psid={psid}&med={calculatedSecurityCode}';
const endLinkTwo = 'https://api.researchnow.com/respondent/'+
			'exit?rst=2&psid={psid}';
const endLinkThree='https://api.researchnow.com/respondent/'+
			'exit?rst=3&psid={psid}';

const options = { method: 'POST',
	url: url,
	headers:
		{ authorization: 'Bearer ' + auth,
			'content-type': 'application/json' },
	body:
		{ extProjectId: 'project001',
			title: 'Test Survey',
			jobNumber: 'PO-1234',
			notificationEmails: [ 'api-test@dynata.com' ],
			devices: [ 'mobile', 'desktop', 'tablet' ],
			category: { surveyTopic: [ 'AUTOMOTIVE', 'BUSINESS' ] },
			lineItems:
			[ { extLineItemId: 'lineItem001',
					title: 'US College',
					countryISOCode: 'US',
					languageISOCode: 'en',
					surveyURL: surveyUrl,
					surveyTestURL: surveyUrlTest,
					indicativeIncidence: 20,
					daysInField: 20,
					lengthOfInterview: 10,
					deliveryType: 'BALANCED',
					sources: [ { id: 100 } ],
					targets: [ { count: 200,
												dailyLimit: 0,
												type: 'COMPLETE' } ],
					quotaPlan:
					 { filters:
							[ { attributeId: '61961',
									options: [ '3', '4' ],
									operator: 'include' } ],
						 quotaGroups:
							[ { name: 'Gender Distribution',
									quotaCells:
									[ { quotaNodes: [ { attributeId: '11',
																			options: [ '1' ],
																			operator: 'include' } ],
											count: 130 },
											{ quotaNodes: [ { attributeId: '11',
																				options: [ '2' ],
																				operator: 'include' } ],
											count: 70 } ] } ] },
					state: 'PROVISIONED',
					stateReason: 'Created by Client',
					stateLastUpdatedAt: '04/01/2018 00:00:00',
					createdAt: '04/01/2018 00:00:00',
					updatedAt: '04/01/2018 00:00:00',
					launchedAt: null,
					endLinks:
						{ complete: 'https://api.researchnow.com/respondent/exit?rst=1&psid={psid}&med={calculatedSecurityCode}',
							screenout: 'https://api.researchnow.com/respondent/exit?rst=2&psid={psid}',
							overquota: 'https://api.researchnow.com/respondent/exit?rst=3&psid={psid}',
							securityKey1: '35040',
							securityLevel: 'MEDIUM' } } ],
		 exclusions: { type: 'PROJECT', list: [] } },
	json: true };

const call = request(options);

if (require.main !== module) module.exports = call;

call.then( function(r) {
	console.log(r);
} ).catch( function() { console.error('Call failed...'); } );
