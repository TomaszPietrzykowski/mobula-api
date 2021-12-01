type KeyVal = {
  key: string
  value: string
}

type EnvArrType = KeyVal[]

const parseEnv = (str: string, env: EnvArrType): string => {
  if (env.length === 0) return str
  let output = str
  env.forEach((el) => {
    output = output.replaceAll(`{{${el.key}}}`, `${el.value}`)
  })
  return output
}

export default parseEnv
