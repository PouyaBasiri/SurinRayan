"use client";

import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { ContactRequestDto } from "@/lib/api";

const HUB_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/hubs/notifications` 
  : "http://localhost:5000/hubs/notifications";

export function useNotificationHub(onNewMessage?: (msg: ContactRequestDto) => void) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("SignalR Connected.");

          connection.on("ReceiveNewContactRequest", (message: ContactRequestDto) => {
            if (onNewMessage) {
              onNewMessage(message);
            }
          });
        })
        .catch((err) => console.error("SignalR Connection Error: ", err));

      return () => {
        connection.stop();
      };
    }
  }, [connection, onNewMessage]);

  return { connection };
}