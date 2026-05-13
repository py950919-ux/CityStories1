import { Card, CardContent } from "@/components/ui/card";

export default function Saved() {
  const savedPlaces: any[] = [];
  const isLoading = false;

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Places</h1>

      {savedPlaces.length === 0 ? (
        <p className="text-muted-foreground">No saved places yet</p>
      ) : (
        <div className="grid gap-4">
          {savedPlaces.map((place, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                {place.name}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
