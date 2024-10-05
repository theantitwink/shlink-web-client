$resolutions = @(16, 24, 32, 40, 48, 60, 64, 72, 76, 96, 114, 120, 128, 144, 150, 152, 160, 167, 180, 192, 196, 228, 256, 310, 384, 512, 1024)

foreach ($resolution in $resolutions) {
    $source = "chains-backside.png"
    $destination = "icon-$resolution`x$resolution.apng"
    ffmpeg -i $source -plays 0 -vf "scale=$resolution`:$resolution" $destination
    # mv "icon-$resolution`x$resolution.png" "icon-$resolution`x$resolution.old.png"
    mv "icon-$resolution`x$resolution.apng" "icon-$resolution`x$resolution.png"
}