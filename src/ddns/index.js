const Core = require('@alicloud/pop-core');
const os = require('os');
const Interfaces = os.networkInterfaces();

const DDNS = async (client, target, cb) => {
	const ADDRESS = target.address;
	const SUBDOMAIN = target.hostname;
	const DOMAINNAME = SUBDOMAIN.split('.').slice(-2).join('.');
	const RR = SUBDOMAIN.split('.').slice(0, -2).join('.');
	const updateParmas = {
		Action: 'UpdateDomainRecord',
		RecordId: '',
		RR: RR,
		Type: 'A',
		Value: ADDRESS
	}

	const addParmas = {
		Action: 'AddDomainRecord',
		DomainName: DOMAINNAME,
		RR: RR,
		Type: 'A',
		Value: ADDRESS
	}

	const describeSubParams = {
		Action: 'DescribeSubDomainRecords',
		SubDomain: SUBDOMAIN
	}

	const requestOption = {
		method: 'POST'
	};

	let shouldUpdate = false;
	let shouldAdd = true;
	let originIp = '';

	await client.request(describeSubParams.Action, describeSubParams, requestOption).then((result) => {
		result.DomainRecords.Record
			.filter(record => record.RR === updateParmas.RR)
			.forEach(record => {
				shouldAdd = false;
				if (record.Value !== updateParmas.Value) {
					shouldUpdate = true;
					originIp = record.Value;
					updateParmas.RecordId = record.RecordId;
				}
			});
	}, (ex) => {
		console.log(ex);
	});

	if (shouldUpdate) {
		return client.request(updateParmas.Action, updateParmas, requestOption).then((resolve, reject) => {
			return cb('Update success!', originIp, updateParmas.Value);
		}, (ex) => {
			console.log(ex);
		});
	}

	if (shouldAdd) {
		return client.request(addParmas.Action, addParmas, requestOption).then((result) => {
			return cb('add success!');
		}, (ex) => {
			console.log(ex);
		});
	}

	if (!shouldAdd && !shouldUpdate) {
		return cb('no update');
	}

}

const ipCheck = (ipAddress) => {
	return /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(ipAddress) && ipAddress  || '';
}

const updateIp = (config) => {
	const client = new Core({
		accessKeyId: config.AccessKeyId,
		accessKeySecret: config.AccessKeySecret,
		endpoint: 'https://alidns.aliyuncs.com',
		apiVersion: '2015-01-09'
	});

	const hostNames = config.hostNames;
	const logArr = hostNames.map((item)=>{
		let target = {
			hostname: item.host,
			address: ipCheck(item.ip) || address
		};

		return DDNS(client, target, (msg, originIp, upIp) => {
			return `${new Date()} ==>  ${target.hostname} ==> ${msg} ${(originIp && `&& ` + originIp + ` ==To==> ` + upIp) || ''}`
		});

	})

	async function logs(){
		const logg = [];
		for (let i = 0; i < logArr.length; i++) {
			const bb = await logArr[i];
			logg.push(bb);
		}
		return logg;
	}

	return logs();
}

module.exports = updateIp;
