import TextFieldBook from '../ui/editor/textfield-book';

export default async function HomePage() {

  return (
    <div className = "page">

      <div className = "flex flex-1 items-center justify-center overflow-hidden">
        <div className = "flex flex-col">
          <h3>What book moved you this week?</h3>
          <p>//Title //Author</p>
        </div>
      </div>

      <TextFieldBook/>
      
    </div>
  );
}