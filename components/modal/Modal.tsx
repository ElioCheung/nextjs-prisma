'use client'

import { PropsWithChildren, useRef, useCallback, useEffect, useState } from 'react'

type ModalProps = {
  visibile: boolean
  closeModal?: () => void
} & PropsWithChildren

export default function Modal({ visibile, closeModal, children }: ModalProps) {
  const wrapper = useRef(null)
  const overlay = useRef(null)

  const onCloseModal = () => {
    closeModal && closeModal()
  }

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // 按‘esc’按键，关闭modal
      if (e.key === 'Escape' && visibile) {
        // 隐藏Modal
        closeModal && closeModal()
      }
    },
    [closeModal, visibile]
  )

  useEffect(
    () => {
      document.addEventListener('keydown', onKeyDown)
      return () => document.removeEventListener('keydown', onKeyDown)
    },
    [onKeyDown]
  )

  if (!visibile) return null

  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
      onClick={closeModal}
    >
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6"
        onClick={closeModal}
      >
        {children}
      </div>
    </div>
  )
}