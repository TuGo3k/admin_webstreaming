import { useState } from "react";
import {Button}  from "../components/Button";
import { Tabs,TabsList, TabsTrigger, TabsContent}  from "../components/Tabs";
import { Card, CardContent} from '../components/Card'

export default function ContentManagement() {
  const [liveStatus, setLiveStatus] = useState("Stopped");
  const vodLibrary = ["Video 1", "Video 2", "Video 3"];
  const categories = ["Horror", "Comedy", "Documentary"];
  const featuredContent = ["Featured 1", "Featured 2"];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Tabs defaultValue="live">
        <TabsList className="flex space-x-2">
          <TabsTrigger value="live">Live Stream</TabsTrigger>
          <TabsTrigger value="vod">VOD Library</TabsTrigger>
          <TabsTrigger value="categories">Categories & Tags</TabsTrigger>
          <TabsTrigger value="featured">Featured Content</TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          <Card>
            <CardContent className="p-4">
              <p className="text-lg font-semibold">Live Stream Management</p>
              <p>Status: {liveStatus}</p>
              <div className="mt-2 space-x-2">
                <Button onClick={() => setLiveStatus("Live")}>Start</Button>
                <Button onClick={() => setLiveStatus("Stopped")} variant="destructive">Stop</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vod">
          <Card>
            <CardContent className="p-4">
              <p className="text-lg font-semibold">Video On Demand Library</p>
              <ul className="list-disc pl-5">
                {vodLibrary.map((video, index) => (
                  <li key={index}>{video}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardContent className="p-4">
              <p className="text-lg font-semibold">Content Categories & Tags</p>
              <ul className="list-disc pl-5">
                {categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="featured">
          <Card>
            <CardContent className="p-4">
              <p className="text-lg font-semibold">Featured & Recommended Content</p>
              <ul className="list-disc pl-5">
                {featuredContent.map((content, index) => (
                  <li key={index}>{content}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
