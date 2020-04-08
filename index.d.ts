declare const md5File: {
	/**
	Asynchronously get the MD5-sum of the file at `path`
	@returns A `Promise` that will be resolved with a string containing the MD5-sum.
	*/
	(path: string): Promise<string>

	/**
	Synchronously get the MD5-sum of the file at `path`
	@returns A string containing the MD5-sum.
	*/
	sync(path: string): string
}

export = md5File
