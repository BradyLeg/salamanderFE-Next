export function findConnectedGroups(imageData, width, height){
    const data = imageData.data;

    // Convert to 2D binary grid (1 = object, 0 = background)
    const grid = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            row.push(data[idx] === 255 ? 1 : 0);  // black = 1, white = 0
        }
        grid.push(row);
    }

    const visited = Array.from({ length: height }, () => Array(width).fill(false));
    const directions = [
        [0, 1], [0, -1],
        [1, 0], [-1, 0]
    ];

    let largestGroup = [];

    function dfs(startY, startX) {
        const stack = [[startY, startX]];
        const pixels = [];

        while (stack.length) {
            const [y, x] = stack.pop();

            if (
                y < 0 || y >= height ||
                x < 0 || x >= width ||
                visited[y][x] ||
                grid[y][x] === 0
            ) continue;

            visited[y][x] = true;
            pixels.push({ x, y });

            for (const [dy, dx] of directions) {
                stack.push([y + dy, x + dx]);
            }
        }

        return pixels;
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x] === 1 && !visited[y][x]) {
                const group = dfs(y, x);
                if (group.length > largestGroup.length) {
                    largestGroup = group;
                }
            }
        }
    }

    // compute centroid
    let sumX = 0, sumY = 0;
    largestGroup.forEach(p => {
        sumX += p.x;
        sumY += p.y;
    });

    const centroid = {
        x: Math.floor(sumX / largestGroup.length),
        y: Math.floor(sumY / largestGroup.length)
    };

    return {
        pixels: largestGroup,
        centroid
    };
}
