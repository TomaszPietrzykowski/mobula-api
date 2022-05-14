type KeyVal = {
  key: string
  value: string
}

type EnvArrType = KeyVal[]

const markEnv = (str: string, env: EnvArrType): string => {
  if (env.length === 0) return str
  let html = str
  env.forEach((el) => {
    html = html.replaceAll(
      `{{${el.key}}}`,
      `<span style="color: lime">{{${el.key}}}</span>`
    )
  })
  return html
}

export default markEnv
