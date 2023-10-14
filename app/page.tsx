"use client";

import { LucideGithub, RewindIcon, RotateCcw } from "lucide-react";
import Image from "next/image";
import { Button, Image as NextImage } from "@nextui-org/react";
import { getPalette } from "react-palette";
import Sig from "./assets/sig.svg";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [colors, setColors] = useState<string[]>([]);
  const [backupColors, setBackupColors] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [backupImage, setBackupImage] = useState<string | null>(null);

  const handleImageUpload = async (fileList: FileList | null) => {
    if (fileList === null || !fileList.length) return;

    const palette = await getPalette(URL.createObjectURL(fileList[0]));

    const keys = Object.keys(palette);

    if (colors.length) setColors([]);

    const newBackupColors = [];
    for (const key of keys) {
      if (palette[key] !== undefined) {
        const color = palette[key];

        setColors((prev) => [...prev, color ?? ""]);
        newBackupColors.push(color ?? "");
      }
    }

    setBackupColors(newBackupColors);

    setImage(URL.createObjectURL(fileList[0]));
    setBackupImage(URL.createObjectURL(fileList[0]));

    toast("Image and colors are loaded!");
  };

  const handleClickImage = () => {
    const fileInput = document.getElementById("dropzone-file");

    if (fileInput) {
      fileInput.click();
    }
  };

  const handleReset = () => {
    toast("Palette reseted!", {
      action: {
        label: "Undo",
        onClick: undoReset,
      },
    });

    setImage("");
    setColors([]);
  };

  const undoReset = () => {
    setImage(backupImage);
    setColors(backupColors);

    toast.success("Palette restored! Now you can chill");
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast(`Color ${color} copied to clipboard!`);
  };

  return (
    <>
      <div className="py-4 px-8 border-b border-zinc-200 flex justify-between items-center">
        <h1>image-2-colors</h1>

        <div className="gap-x-4 flex items-center">
          <a href="https://github.com/igorfelipeduca/image-2-colors">
            <LucideGithub />
          </a>

          <a href="https://biome.sigcoding.com">
            <Image className="h-7 w-7 invert" alt="Sig" src={Sig} />
          </a>
        </div>
      </div>

      <main
        className={`${
          image && colors.length ? "pt-8" : "pt-[7.5rem] lg:pt-32"
        } pb-16 lg:pb-[10.5rem] px-8`}
      >
        {image && colors.length ? (
          <div className="flex justify-end pb-8">
            <Button
              className="rounded-lg bg-black text-white"
              onClick={handleReset}
            >
              Reset palette <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <></>
        )}

        <div className="flex justify-center">
          <h1 className="text-3xl text-black font-bold">
            image-<span style={{ color: colors[0] }}>2</span>-colors
          </h1>
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-zinc-700">
            this app will easily help you to collect colors from images and use
            them to develop your websites.
          </h3>
        </div>

        <div className="mt-8 flex justify-center">
          {image ? (
            <>
              <NextImage
                src={image}
                className="h-full w-96 lg:w-full lg:max-w-3xl rounded-lg cursor-pointer transitin-all ease-linear duration-150 object-cover"
                isBlurred
                onClick={handleClickImage}
              />

              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
              />
            </>
          ) : (
            <div className="flex items-center justify-center w-full lg:max-w-3xl">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
              </label>
            </div>
          )}
        </div>

        <div className="mt-8 lg:flex lg:justify-center">
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
            {colors.map((color, index) => (
              <div className="flex flex-col items-center gap-y-2" key={index}>
                <div
                  className="rounded-lg h-20 w-20 lg:h-28 lg:w-28 cursor-pointer transition-all ease-linear duration-150 hover:opacity-75"
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() => copyToClipboard(color)}
                />

                <span className="text-zinc-600">{color}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="mt-8 bg-zinc-50 border-t border-zinc-300 py-4 px-8 flex gap-x-2 items-center">
        <NextImage
          src={"https://i.ibb.co/Bwzr3t2/duca.jpg"}
          alt="ducaswtf"
          isBlurred
          className="h-10 w-10 rounded-full"
        />

        <span className="text-zinc-700">
          made by{" "}
          <a
            href="https://twitter.com/ducaswtf"
            className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-700 to-zinc-950 font-medium"
            style={{ color: colors[0] }}
          >
            Duca
          </a>
          .
        </span>
      </div>

      <div className="z-50">
        <Toaster />
      </div>
    </>
  );
}
