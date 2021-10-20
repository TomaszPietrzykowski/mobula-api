export interface Props {
    title: string
    color?: string
  }

const Header = (props: Props): JSX.Element => {
    return (
        <header>
            <h1 style={{color: props.color}}>{props.title}</h1>
        </header>
    )
}

export default Header
