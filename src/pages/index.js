// pages/index.js
// import Header from "@/components/Header"
// import VideoPlayer from "@/components/VideoPlayer"
// // import Timeline from "./components/Timeline"
// import Timeline from "../components/Timeline"
// import EditingTools from "@/components/EditingTools"
// import { Button } from "@/components/ui/button"
// import { MenuIcon, SaveIcon, ShareIcon, SettingsIcon } from "@/components/icons"

// export default function Home() {
//   const tools = [
//     { id: 'brightness', label: 'Brightness' },
//     { id: 'contrast', label: 'Contrast' },
//     { id: 'saturation', label: 'Saturation' },
//     { id: 'volume', label: 'Volume' },
//     { id: 'speed', label: 'Speed' },
//     { id: 'opacity', label: 'Opacity' },
//     { id: 'rotation', label: 'Rotation' },
//     { id: 'scale', label: 'Scale' },
//     { id: 'blur', label: 'Blur' },
//     { id: 'grayscale', label: 'Grayscale' },
//     { id: 'hue-rotate', label: 'Hue Rotate' },
//     { id: 'invert', label: 'Invert' },
//   ];

//   return (
//     <div className="flex h-screen w-full">
//       <div className="flex-1 bg-background">
//         <div className="flex h-full flex-col">
//           <Header
//             title="Video Editor"
//             leftButtons={[() => <Button variant="ghost" size="icon"><MenuIcon className="h-5 w-5" /></Button>]}
//             rightButtons={[
//               () => <Button variant="ghost" size="icon"><SaveIcon className="h-5 w-5" /></Button>,
//               () => <Button variant="ghost" size="icon"><ShareIcon className="h-5 w-5" /></Button>,
//               () => <Button variant="ghost" size="icon"><SettingsIcon className="h-5 w-5" /></Button>,
//             ]}
//           />
//           <div className="flex-1 grid grid-cols-[1fr_300px] gap-4 p-4">
//             <div className="flex flex-col gap-4">
//               <VideoPlayer src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
//               <Timeline items={Array(5).fill().map((_, index) => `Item ${index + 1}`)} />
//             </div>
//             <EditingTools tools={tools} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
