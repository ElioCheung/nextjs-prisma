import { ForwardedRef, HTMLInputTypeAttribute, forwardRef } from 'react';
import FormHeader from './FormHeader';
import SubmitButton from '../button/SubmitButton';

export interface FormItemProps {
  type: HTMLInputTypeAttribute
  label?: string
  key: string
  required?: boolean
  hidden?: boolean
  readOnly?: boolean
  placeholder?: string
  className?: string
}

type FormProps = {
  className?: string
  id?: string
  title?: string
  items: FormItemProps[]
  btnTxt: string
  action: (data: FormData) => void
}

const Form = ({ title, id, items, btnTxt, action }: FormProps, ref: ForwardedRef<HTMLFormElement>) => {
  id = id || Date.now().toString()

  const body: JSX.Element[] = items.map((item) => {
    if (item.hidden) {
      return <input type={item.type} id={item.key} name={item.key} key={item.key} required={item.required} readOnly={item.readOnly} placeholder={item.placeholder} className='hidden' />
    } else {
      const classes = item.type === 'text' ? 'form-input flex-1 rounded-lg' : item.type === 'textarea' ? 'form-textarea flex-1 rounded-lg' : 'form-checkbox'
      return (
        <div className='w-1/2 p-5 flex items-center' key={item.key}>
          <label className='w-24 text-gray-400' htmlFor={item.key}>{item.label || item.key}</label>
          {
            item.type === 'textarea' ?
              <textarea rows={4} name={item.key} key={item.key} required={item.required} readOnly={item.readOnly} placeholder={item.placeholder} id={item.key} className={classes} />
              :
              <input type={item.type} name={item.key} key={item.key} required={item.required} readOnly={item.readOnly} placeholder={item.placeholder} id={item.key} className={classes} />
          }
        </div>
      )
    }
  })


  return (
    <>
      <form ref={ref} className='w-full flex flex-col items-center' action={action}>
        <FormHeader title={title} />
        {body}
        <div className='w-1/2 p-5 flex items-center'>
          <div className='flex-1 pl-24'>
            <SubmitButton
              btnText={btnTxt}
              className='w-full text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-200 rounded-xl p-2'
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default forwardRef(Form)
