import TextFieldBook from '../ui/editor/textfield-book';

export default async function HomePage() {

    return (
        <>
          <div className = "flex flex-col h-full w-full">

            <div className = "flex flex-1 items-center justify-center overflow-hidden">
              <div className = "flex flex-col">
                <p className = "text-lg">What book moved you this week?</p>
                <p className = "text-lg text-gray-600">//Title //Author</p>
              </div>
            </div>

            <TextFieldBook/>
            
          </div>
        </>
    );
}