import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

function Videochat() {
  const { roomId } = useParams();
  const elementRef = useRef(null);

  useEffect(() => {
    const meeting = async () => {
      const appID = 1145816925;
      const serverSecret = "e8fbdcfcdd9d2daa47f6246eaaf12cf1";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        "test"


      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: elementRef.current,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `http://localhost:5173/room/${roomId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
        showRoomTimer: true,
        // onReturnToHomeScreenClicked?: () => void; // When the "Return to home screen" button is clicked, this callback is triggered. After setting up this callback, clicking the button will not navigate to the home screen; instead, you can add your own page navigation logic here.
      });
    };

    meeting();
  }, [roomId]);

  return (
    <Box w={'100px'} h={'100px'}>
      <div ref={elementRef}></div>
     <Box w="500px" h={'500px'} bg={'red'}>

     </Box>
    </Box>
  );
}

export default Videochat;