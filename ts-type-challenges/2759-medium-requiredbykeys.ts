interface User2 {
    name?: string
    age?: number
    address?: string
  }
  
type UserPartialName2 = RequiredByKeys<User2, 'name'> // { name: string; age?: number; address?: string }

type RequiredByKeys<T extends {}, U = keyof T> = Omit<Required<Pick<T, U & keyof T>> & Omit<T, U & keyof T>, never>;
  