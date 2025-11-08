export default async function MoviePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div>
      {id}
      <h1>Movie Page</h1>
    </div>
  );
}
