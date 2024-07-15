# Directory containing the SVG frames
$svgDir = "$PSScriptRoot"

# Output file for the animated SVG
$outputFile = "../../favicon.svg"

# Read all SVG files sorted alphabetically by their filenames
$svgFiles = Get-ChildItem -Path $svgDir -Filter *.svg | Sort-Object Name

# Create a new XML document for the animated SVG
[xml]$animatedSvg = New-Object system.xml.xmlDocument
$root = $animatedSvg.CreateElement("svg")
$root.SetAttribute("xmlns", "http://www.w3.org/2000/svg")
$root.SetAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink")
$root.SetAttribute("width", "200")
$root.SetAttribute("height", "200")
$root.SetAttribute("viewBox", "0 0 200 200")
$animatedSvg.AppendChild($root) | Out-Null

# Generate the <g> elements for each frame
$counter = 0
$duration = 3 # total duration in seconds for one full cycle
$frameCount = $svgFiles.Count
$eachDuration = $duration / $frameCount

# Read each SVG file and wrap its content in a <g> element
foreach ($file in $svgFiles) {
    [xml]$svgContent = Get-Content -Path $file.FullName -Raw
    $frameId = "frame$counter"
    
    # Create a new <g> element for the frame
    $gElement = $animatedSvg.CreateElement("g")
    $gElement.SetAttribute("id", $frameId)
    if ($counter -ne 0) {
        $gElement.SetAttribute("style", "display: none;")
    }

    # Import the child nodes from the frame content
    foreach ($node in $svgContent.DocumentElement.ChildNodes) {
        $importedNode = $animatedSvg.ImportNode($node, $true)
        $gElement.AppendChild($importedNode) | Out-Null
    }
    $root.AppendChild($gElement) | Out-Null

    # Create <set> elements for the animation
    $setElementVisible = $animatedSvg.CreateElement("set")
    $setElementVisible.SetAttribute("attributeName", "style")
    $setElementVisible.SetAttribute("to", "display:inline")
    $setElementVisible.SetAttribute("begin", "${counter * $eachDuration}s")
    $setElementVisible.SetAttribute("dur", "${eachDuration}s")
    $setElementVisible.SetAttribute("repeatCount", "indefinite")
    $gElement.AppendChild($setElementVisible) | Out-Null
    
    $setElementHidden = $animatedSvg.CreateElement("set")
    $setElementHidden.SetAttribute("attributeName", "style")
    $setElementHidden.SetAttribute("to", "display:none")
    $setElementHidden.SetAttribute("begin", "$(($counter + 1) * $eachDuration)s")
    $setElementHidden.SetAttribute("dur", "0.001s")
    $setElementHidden.SetAttribute("repeatCount", "indefinite")
    $gElement.AppendChild($setElementHidden) | Out-Null
    
    # Increment counter
    $counter++
}

# Save the combined animated SVG to the output file
$animatedSvg.Save($outputFile)

Write-Host "Animated SVG created at $outputFile"