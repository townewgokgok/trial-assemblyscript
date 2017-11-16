import * as loader from "assemblyscript-loader";

// process.on('unhandledRejection', (reason, p) => {
//     console.error('Unhandled Rejection at:', p, 'reason:', reason);
// });

let asm: {[name:string]:any} = {};

async function loadWasm(name, wasm): Promise<void> {
	let mod = await loader.load(wasm);
	asm[name] = mod.exports;
}

async function loadWasms(wasms): Promise<void> {
	let tasks = [];
	for (let name in wasms) {
		tasks.push(loadWasm(name, wasms[name]));
	}
	await Promise.all(tasks);
}

async function main(): Promise<void> {
	await loadWasms({
		trial: "./dist/trial.wasm"
	});
	asm.trial.hello();
	console.log(asm.trial.add(1, 10.1));
}

main();
