const Form = () => {
  return (
    <>
      <div>
        <form>
          <label htmlFor="name" className="text-black">
            Nome:
          </label>
          <input type="text" id="name" className="text-black" />
          {/* Adicione mais campos de formulário aqui */}
        </form>
      </div>
      <button id="pdf">Convert Current BrowserWindow to PDF</button>
    </>
  )
}

export default Form
