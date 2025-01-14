import TextFieldBook from '../ui/editor/textfield-book';

export default async function HomePage() {

  return (
    <div className = "page">
      <div>
        <h3>What book moved you this week?</h3>
      </div>

      <TextFieldBook/>
      
    </div>
  );
}