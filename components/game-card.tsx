"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function GameCard({ game }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image src={game.image || "/placeholder.svg"} alt={game.name} fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>{game.shortDescription}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button asChild>
          <Link href={`/games/${game.id}`}>Play</Link>
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Info</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{game.name}</DialogTitle>
              <DialogDescription>{game.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">How to Play:</h4>
              <p>{game.howToPlay}</p>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

