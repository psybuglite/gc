import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/** Everything the guide enters across the application steps. Extended as steps are added. */
export type ApplicationData = {
  firstName: string
  lastName: string
  intro: string
  nationality: string
  dob: string
  phoneCountry: string
  phone: string
  street: string
  city: string
  state: string
  tourWord: string
  languages: string[]
  experience: '' | 'professional' | 'informal' | 'new'
  years: string
  tourStory: string
  hourlyRate: number
  idType: 'passport' | 'drivers-licence' | 'national-id'
  idNumber: string
  idIssue: string
  idExpiry: string
  references: Reference[]
}

export type Reference = { name: string; relationship: string; email: string }

/** Files can't be saved to localStorage, so they live in memory for the session only. */
export type Photo = { id: string; url: string; name: string; progress: number }
export type Attachments = { profilePhoto: File | null; photos: Photo[]; idDoc: File | null }

const EMPTY: ApplicationData = {
  firstName: '',
  lastName: '',
  intro: '',
  nationality: 'NG',
  dob: '',
  phoneCountry: 'NG',
  phone: '',
  street: '',
  city: '',
  state: '',
  tourWord: '',
  languages: ['English'],
  experience: '',
  years: '',
  tourStory: '',
  hourlyRate: 25,
  idType: 'passport',
  idNumber: '',
  idIssue: '',
  idExpiry: '',
  references: [
    { name: '', relationship: '', email: '' },
    { name: '', relationship: '', email: '' },
  ],
}
const STORAGE_KEY = 'gc.guideApplication.v1'

type Ctx = {
  attachments: Attachments
  setAttachments: React.Dispatch<React.SetStateAction<Attachments>>
  data: ApplicationData
  update: (patch: Partial<ApplicationData>) => void
  reset: () => void
}

const ApplicationContext = createContext<Ctx | null>(null)

function load(): ApplicationData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY
  } catch {
    return EMPTY
  }
}

/** "Your progress saves as you go" — persisted to localStorage until a backend exists. */
export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ApplicationData>(load)
  const [attachments, setAttachments] = useState<Attachments>({ profilePhoto: null, photos: [], idDoc: null })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      /* storage unavailable — keep in memory only */
    }
  }, [data])

  const value: Ctx = {
    attachments,
    setAttachments,
    data,
    update: (patch) => setData((d) => ({ ...d, ...patch })),
    reset: () => setData(EMPTY),
  }
  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
}

export function useApplication() {
  const ctx = useContext(ApplicationContext)
  if (!ctx) throw new Error('useApplication must be used inside ApplicationProvider')
  return ctx
}
