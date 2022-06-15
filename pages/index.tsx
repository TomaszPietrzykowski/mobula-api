import Head from 'next/head'
import { FC } from 'react'
import styles from '../styles/Home.module.css'

const Home: FC = () => {
  // logic
  let output: any = 'test'
  let name: string = 'Mobula Tarapacana'
  let num: number = 5
  let isOn: boolean = true
  let numbers: number[] = [1, 2, 3, 4]
  let tuple: [number, string, boolean] = [1, '3', true]
  let tupleArray: [number, string][] = [
    [1, '3'],
    [2, '3'],
  ]

  // Union
  let id: number | string = '2'

  // Enum
  enum DirectionNr {
    up,
    down,
    left,
    right,
  }
  enum DirectionStr {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right',
  }

  // Objects
  type User = { id: number | string; name: string }

  const user: User = {
    id: 1,
    name: 'Joseph',
  }

  // Type assertion
  let cid: any = 1
  let customerId = cid as string
  customerId = '2'

  // Functions
  const add = (num1: number, num2: number): number => {
    return num1 + num2
  }

  // Void (no return)
  const print = (content: string | number): void => {
    output = content
  }

  // Interface
  interface UserInterface {
    readonly id: number | string
    name: string
    age?: number // optional
  }

  const userOutOfInterface: UserInterface = {
    id: 1,
    name: 'Nameee',
  }
  userOutOfInterface.name = 'Dupersztyngiel'
  let o: any = userOutOfInterface.name

  // Function interface
  interface MathFunc {
    (num1: number, num2: number): number
  }

  const detract: MathFunc = (x, y) => x - y

  // Classes

  interface PersonClassInterface {
    id: number
    name: string
    register(): string
  }

  class Person implements PersonClassInterface {
    id: number
    name: string

    constructor(id: number, name: string) {
      this.id = id
      this.name = name
    }

    register = () => `${this.name} is registered`
  }

  const pers = new Person(123, 'Nowy')

  // Class extension Subclasses

  class Employee extends Person {
    position: string

    constructor(id: number, name: string, position: string) {
      super(id, name)
      this.position = position
    }
  }

  // Generics
  const getArray = <T extends {}>(items: T[]): T[] => new Array().concat(items)
  const numArray = getArray<number>([1, 2, 3, 4])
  const stringArray = getArray<string>(['1', '2', '3', '4'])

  numArray.push(5)

  // output
  pers.register()

  return (
    <div className={styles.container}>
      <Head>
        <title>Mobula API</title>
        <meta
          name='description'
          content='Mobula.dev: Browser based HTTP/API client'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Mobula API</h1>

        <p className={styles.description}>Boilerplate output:</p>
        <section>Hero</section>
        <section>Features</section>
      </main>
    </div>
  )
}

export default Home
