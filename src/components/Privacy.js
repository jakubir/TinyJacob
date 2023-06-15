import React from 'react'

export default function Privacy() {
  return (
    <div className='p-4'>
        <h1 className='font-bold mb-3'>Polityka prywatności serwisu tiny.jakubirla.pl</h1>
        <ol className='ml-5'>
            <li>
                <h2 className='font-semibold'>Reklamy na stronie: </h2>
                <ul className='ml-5 list-disc max-w-xl'>
                    <li>
                        Dostawcy zewnętrzni, w tym Google, używają plików cookie do wyświetlania reklam na podstawie poprzednich odwiedzin użytkownika w witrynie tiny.jakubirla.pl lub w innych witrynach.
                    </li>
                    <li>
                        Pliki cookie do wyświetlania reklam umożliwiają firmie Google i jej partnerom wyświetlanie użytkownikom konkretnych reklam na podstawie ich odwiedzin w witrynie tiny.jakubirla.pl i/lub innych witrynach internetowych.
                    </li>
                    <li>
                        Użytkownicy mogą zrezygnować ze spersonalizowanych reklam w <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Ustawieniach reklam</a> w koncie Google. Użytkownicy mogą też zrezygnować z wykorzystywania plików cookie innych firm do wyświetlania spersonalizowanych reklam. Wystarczy wejść na stronę <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener">www.aboutads.info</a>.
                    </li>
                </ul>
            </li>
        </ol>
    </div>
  )
}
