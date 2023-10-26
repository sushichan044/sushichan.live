const declareLet: <T>(value: () => T) => T = (value) => value()

export { declareLet }
