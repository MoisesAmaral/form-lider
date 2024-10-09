import { createContext } from 'react'

interface ILoaderContext {
  loader: boolean
  setLoader: React.Dispatch<React.SetStateAction<boolean>>
}
export const LoaderContext = createContext<ILoaderContext>({} as ILoaderContext)
