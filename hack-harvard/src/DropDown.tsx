import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join('   ');
}

export default function DropDown({initialSelected, options, changeSel}) {
  const [selected, setSelected] = useState(initialSelected)
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center 0 text-indigo-500 font-bold underline underline-offset-8 decoration-1 hover:text-indigo-800">
          {selected}
          <ChevronDownIcon className="flex-col self-center mr-2 ml-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white focus:outline-none text-lg border">
          <div className="py-1">
            {options.filter(item => (item !== selected)).map((option) => (
            <Menu.Item>
              {({ active }) => (
                <button 
                  value={option}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected(e.target.value)
                    changeSel(e.target.value)
                  }
                  }
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2', 'w-full text-left'
                  )}
                >
                  {option}
                </button>
              )}
            </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
