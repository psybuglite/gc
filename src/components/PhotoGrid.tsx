import { useRef } from 'react'
import { CloseIcon } from './icons/CloseIcon'
import { ImagePlusIcon } from './icons/MiscIcons'
import type { Photo } from '../state/application'

type PhotoGridProps = {
  photos: Photo[]
  max?: number
  onAdd: (files: File[]) => void
  onRemove: (id: string) => void
}

const emptyTile =
  'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-[1.5px] border-dashed border-border-strong bg-bg-surface-muted p-3 text-text-secondary'

function RemoveButton({ onClick, name }: { onClick: () => void; name: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Remove ${name}`}
      className="absolute top-2 right-2 flex size-7 cursor-pointer items-center justify-center rounded-full bg-bg-surface text-text-primary"
    >
      <CloseIcon className="size-3.5" />
    </button>
  )
}

/** UI/Photo Tile mosaic: cover photo, two side tiles, then a row of tiles (empty → uploading → uploaded). */
export function PhotoGrid({ photos, max = 6, onAdd, onRemove }: PhotoGridProps) {
  const input = useRef<HTMLInputElement>(null)
  const open = () => input.current?.click()

  const tile = (i: number, className: string) => {
    const photo = photos[i]
    if (!photo) {
      return (
        <button key={i} type="button" onClick={open} className={`${emptyTile} ${className}`}>
          <ImagePlusIcon className="size-6" />
          <span className="text-xs leading-[18px] font-medium">Add photo</span>
        </button>
      )
    }
    if (photo.progress < 100) {
      return (
        <div key={i} className={`flex flex-col items-center justify-center gap-2 rounded-lg bg-bg-surface-muted p-3 ${className}`}>
          <span className="text-xs leading-[18px] font-medium text-text-secondary">Uploading… {photo.progress}%</span>
          <div className="h-1 w-full overflow-hidden rounded-full bg-border-subtle">
            <div className="h-1 rounded-full bg-brand-primary transition-[width]" style={{ width: `${photo.progress}%` }} />
          </div>
        </div>
      )
    }
    return (
      <div key={i} className={`relative overflow-hidden rounded-lg ${className}`}>
        <img src={photo.url} alt={photo.name} className="absolute inset-0 size-full object-cover" />
        <RemoveButton name={photo.name} onClick={() => onRemove(photo.id)} />
      </div>
    )
  }

  const cover = photos[0]
  const showSixth = photos.length >= max - 1

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_200px]">
        {/* Cover photo */}
        {cover && cover.progress === 100 ? (
          <div className="relative h-[170px] overflow-hidden rounded-2xl p-3 md:h-[200px]">
            <img src={cover.url} alt={cover.name} className="absolute inset-0 size-full object-cover" />
            <span className="relative rounded-full bg-bg-surface px-2.5 py-1 text-xs leading-4 font-semibold text-text-primary">Cover photo</span>
            <RemoveButton name={cover.name} onClick={() => onRemove(cover.id)} />
          </div>
        ) : cover ? (
          <div className="flex h-[170px] flex-col items-center justify-center gap-2 rounded-2xl bg-bg-surface-muted p-3 md:h-[200px]">
            <span className="text-xs leading-[18px] font-medium text-text-secondary">Uploading… {cover.progress}%</span>
            <div className="h-1 w-40 overflow-hidden rounded-full bg-border-subtle">
              <div className="h-1 rounded-full bg-brand-primary transition-[width]" style={{ width: `${cover.progress}%` }} />
            </div>
          </div>
        ) : (
          <button type="button" onClick={open} className={`${emptyTile} h-[170px] rounded-2xl md:h-[200px]`}>
            <ImagePlusIcon className="size-6" />
            <span className="text-xs leading-[18px] font-medium">Add cover photo</span>
          </button>
        )}
        {/* Side tiles */}
        <div className="grid grid-cols-2 gap-3 max-md:h-[116px] md:size-[200px] md:grid-cols-1 md:grid-rows-2">
          {tile(1, 'min-h-px')}
          {tile(2, 'min-h-px')}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {tile(3, 'h-[116px] md:h-[110px]')}
        {tile(4, 'h-[116px] md:h-[110px]')}
        {tile(5, `h-[116px] md:h-[110px] ${showSixth ? 'max-md:col-span-2' : 'max-md:hidden'}`)}
      </div>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = [...(e.target.files ?? [])].slice(0, max - photos.length)
          if (files.length) onAdd(files)
          e.target.value = ''
        }}
      />
    </div>
  )
}
