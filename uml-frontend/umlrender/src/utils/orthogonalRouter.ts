import { Direction } from "@meta2d/core";
export function orthogonalRouter(store: import("@meta2d/core").Meta2dStore, linkView: import("@meta2d/core").Pen, mouseDown: import("@meta2d/core").Point) {
    console.log("orthogonalRouter");
    console.log(linkView);
    var sourceBBox = store.pens[linkView.anchors[0].connectTo];
    var targetBBox = store.pens[linkView.anchors[linkView.anchors.length - 1].connectTo];
    console.log(sourceBBox, targetBBox);
    var sourcePoint = linkView.anchors[0];
    var targetPoint = linkView.anchors[linkView.anchors.length - 1];
    console.log(sourcePoint, targetPoint);

    const { x: tx0, y: ty0 } = targetBBox;
    const { x: sx0, y: sy0 } = sourceBBox;
    // const { x: sox1, y: soy1 } = sourcePoint;
    // const { x: tox1, y: toy1 } = targetPoint;
    const sourceCoordinates = {
        x: linkView.x + (linkView.ex - linkView.x) * sourcePoint.x,
        y: linkView.y + (linkView.ey - linkView.y) * sourcePoint.y
    };
    const targetCoordinates = {
        x: linkView.x + (linkView.ex - linkView.x) * targetPoint.x,
        y: linkView.y + (linkView.ey - linkView.y) * targetPoint.y
    };
    // const sourceOutsidePoint = sourcePoint.clone();
    const spacing = 28;
    let sourceSide;
    console.log(sourceBBox.x, sourceBBox.y);
    console.log(sourceCoordinates.x, sourceCoordinates.y);

    if (sourceCoordinates.x >= sourceBBox.x + 125 && sourceCoordinates.x <= sourceBBox.x + 145
        && sourceCoordinates.y >= sourceBBox.y - 10 && sourceCoordinates.y <= sourceBBox.y + 10) {
        // sourceCoordinates.y = sy0 - spacing;
        sourceSide = Direction.Up;
    } else if (sourceCoordinates.x >= sourceBBox.x + 125 && sourceCoordinates.x <= sourceBBox.x + 145) {
        // sourceCoordinates.y = sy0 + sourceBBox.height + spacing;
        sourceSide = Direction.Bottom;
    } else if (sourceCoordinates.x >= sourceBBox.x - 10 && sourceCoordinates.x <= sourceBBox.x + 10) {
        // sourceCoordinates.x = sx0 - spacing;
        sourceSide = Direction.Left;
    } else if (sourceCoordinates.x >= sourceBBox.x + sourceBBox.width - 10 && sourceCoordinates.x <= sourceBBox.x + sourceBBox.width + 10) {
        // sourceCoordinates.x = sx0 + sourceBBox.width + spacing;
        sourceSide = Direction.Right;
    }
    else {
        sourceSide = Direction.Up;
    }
    console.log(sourceSide);

    // const sourceSide = sourcePoint.direction;
    switch (sourceSide) {
        case Direction.Left:
            sourceCoordinates.x = sx0 - spacing;
            break;
        case Direction.Right:
            sourceCoordinates.x = sx0 + sourceBBox.width + spacing;
            break;
        case Direction.Up:
            sourceCoordinates.y = sy0 - spacing;
            break;
        case Direction.Bottom:
            sourceCoordinates.y = sy0 + sourceBBox.height + spacing;
            break;
    }
    // const targetOutsidePoint = targetPoint.clone();
    let targetSide;
    console.log(targetBBox.x, targetBBox.y);
    console.log(targetCoordinates.x, targetCoordinates.y);
    if (targetCoordinates.x >= targetBBox.x + 125 && targetCoordinates.x <= targetBBox.x + 145
        && targetCoordinates.y >= targetBBox.y - 10 && targetCoordinates.y <= targetBBox.y + 10) {
        targetSide = Direction.Up;
    } else if (targetCoordinates.x >= targetBBox.x + 125 && targetCoordinates.x <= targetBBox.x + 145) {
        targetSide = Direction.Bottom;
    } else if (targetCoordinates.x >= targetBBox.x - 10 && targetCoordinates.x <= targetBBox.x + 10) {
        targetSide = Direction.Left;
    } else if (targetCoordinates.x >= targetBBox.x + targetBBox.width - 10 && targetCoordinates.x <= targetBBox.x + targetBBox.width + 10) {
        targetSide = Direction.Right;
    }
    else {
        targetSide = Direction.Up;
    }
    console.log(targetSide);

    switch (targetSide) {
        case Direction.Left:
            targetCoordinates.x = targetBBox.x - spacing;
            break;
        case Direction.Right:
            targetCoordinates.x = targetBBox.x + targetBBox.width + spacing;
            break;
        case Direction.Up:
            targetCoordinates.y = targetBBox.y - spacing;
            break;
        case Direction.Bottom:
            targetCoordinates.y = targetBBox.y + targetBBox.height + spacing;
            break;
    }

    const { x: sox, y: soy } = sourceCoordinates;
    const { x: tox, y: toy } = targetCoordinates;
    const tx1 = tx0 + targetBBox.width;
    const ty1 = ty0 + targetBBox.height;
    const tcx = (tx0 + tx1) / 2;
    const tcy = (ty0 + ty1) / 2;
    const sx1 = sx0 + sourceBBox.width;
    const sy1 = sy0 + sourceBBox.height;

    const source = linkView.calculative.worldAnchors[0];
    const target = linkView.calculative.worldAnchors[linkView.calculative.worldAnchors.length - 1];

    linkView.calculative.worldAnchors = [];

    // 修改设置linkView.calculative.worldAnchors锚点即可
    // 这里的锚点为世界坐标 - canvas的绘画坐标

    if (sourceSide === Direction.Left && targetSide === Direction.Right) {
        console.log("s:left t:right");
        if (sox < tox) {
            let y = (soy + toy) / 2;
            if (sox < tx0) {
                if (y > tcy && y < ty1 + spacing) {
                    y = ty0 - spacing;
                } else if (y <= tcy && y > ty0 - spacing) {
                    y = ty1 + spacing;
                }
            }
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: soy });
            linkView.calculative.worldAnchors.push({ x: sox, y: y });
            linkView.calculative.worldAnchors.push({ x: tox, y: y });
            linkView.calculative.worldAnchors.push({ x: tox, y: toy });

            linkView.calculative.worldAnchors.push(target);// return [
            //     { x: sox, y: soy },
            //     { x: sox, y },
            //     { x: tox, y },
            //     { x: tox, y: toy }
            // ];
            return;
        } else {
            const x = (sox + tox) / 2;
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: x, y: soy });
            linkView.calculative.worldAnchors.push({ x: x, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x, y: soy },
            //     { x, y: toy }
            // ];
        }
    } else if (sourceSide === Direction.Right && targetSide === Direction.Left) {
        console.log("s:right t:left");
        // Right to left
        if (sox > tox) {
            let y = (soy + toy) / 2;
            if (sox > tx1) {
                if (y > tcy && y < ty1 + spacing) {
                    y = ty0 - spacing;
                } else if (y <= tcy && y > ty0 - spacing) {
                    y = ty1 + spacing;
                }
            }
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: soy });
            linkView.calculative.worldAnchors.push({ x: sox, y: y });
            linkView.calculative.worldAnchors.push({ x: tox, y: y });
            linkView.calculative.worldAnchors.push({ x: tox, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x: sox, y: soy },
            //     { x: sox, y },
            //     { x: tox, y },
            //     { x: tox, y: toy }
            // ];
        } else {
            const x = (sox + tox) / 2;
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: x, y: soy });
            linkView.calculative.worldAnchors.push({ x: x, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x, y: soy },
            //     { x, y: toy }
            // ];
        }
    } else if (sourceSide === Direction.Up && targetSide === Direction.Bottom) {
        console.log("s:up t:bottom");
        // analogical to let to right
        if (soy < toy) {
            let x = (sox + tox) / 2;
            if (soy < ty0) {
                if (x > tcx && x < tx1 + spacing) {
                    x = tx0 - spacing;
                } else if (x <= tcx && x > tx0 - spacing) {
                    x = tx1 + spacing;
                }
            }
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: soy });
            linkView.calculative.worldAnchors.push({ x: x, y: soy });
            linkView.calculative.worldAnchors.push({ x: x, y: toy });
            linkView.calculative.worldAnchors.push({ x: tox, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x: sox, y: soy },
            //     { x, y: soy },
            //     { x, y: toy },
            //     { x: tox, y: toy }
            // ];
        }
        const y = (soy + toy) / 2;
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: sox, y: y });
        linkView.calculative.worldAnchors.push({ x: tox, y: y });

        linkView.calculative.worldAnchors.push(target); return;
        // return [
        //     { x: sox, y },
        //     { x: tox, y }
        // ];
    } else if (sourceSide === Direction.Bottom && targetSide === Direction.Up) {
        console.log("s:bottom t:up");
        // analogical to right to left
        if (soy >= toy) {
            let x = (sox + tox) / 2;
            if (soy > ty1) {
                if (x > tcx && x < tx1 + spacing) {
                    x = tx0 - spacing;
                } else if (x <= tcx && x > tx0 - spacing) {
                    x = tx1 + spacing;
                }
            }
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: soy });
            linkView.calculative.worldAnchors.push({ x: x, y: soy });
            linkView.calculative.worldAnchors.push({ x: x, y: toy });
            linkView.calculative.worldAnchors.push({ x: tox, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x: sox, y: soy },
            //     { x, y: soy },
            //     { x, y: toy },
            //     { x: tox, y: toy }
            // ];
        }
        const y = (soy + toy) / 2;
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: sox, y: y });
        linkView.calculative.worldAnchors.push({ x: tox, y: y });

        linkView.calculative.worldAnchors.push(target); return;
        // return [
        //     { x: sox, y },
        //     { x: tox, y }
        // ];
    } else if (sourceSide === Direction.Up && targetSide === Direction.Up) {
        console.log("s:up t:up");
        const y = Math.min(soy, toy);
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: sox, y: y });
        linkView.calculative.worldAnchors.push({ x: tox, y: y });

        linkView.calculative.worldAnchors.push(target);
        return;
        // return [
        //     { x: sox, y },
        //     { x: tox, y }
        // ];
    } else if (sourceSide === Direction.Bottom && targetSide === Direction.Bottom) {
        console.log("s:bottom t:bottom");
        const y = Math.max(soy, toy);
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: sox, y: y });
        linkView.calculative.worldAnchors.push({ x: tox, y: y });

        linkView.calculative.worldAnchors.push(target); return;
        // return [
        //     { x: sox, y },
        //     { x: tox, y }
        // ];
    } else if (sourceSide === Direction.Left && targetSide === Direction.Left) {
        console.log("s:left t:left");
        const x = Math.min(sox, tox);
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: x, y: soy });
        linkView.calculative.worldAnchors.push({ x: x, y: toy });

        linkView.calculative.worldAnchors.push(target);
        return;
        // return [
        //     { x, y: soy },
        //     { x, y: toy }
        // ];
    } else if (sourceSide === Direction.Right && targetSide === Direction.Right) {
        console.log("s:right t:right");
        const x = Math.max(sox, tox);
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: x, y: soy });
        linkView.calculative.worldAnchors.push({ x: x, y: toy });

        linkView.calculative.worldAnchors.push(target); return;
        // return [
        //     { x, y: soy },
        //     { x, y: toy }
        // ];
    } else if (sourceSide === Direction.Up && targetSide === Direction.Right) {
        console.log("s:up t:right");
        if (soy > toy) {
            if (sox < tox) {
                let y = (sy0 + toy) / 2;
                if (y > tcy && y < ty1 + spacing && sox < tx0 - spacing) {
                    y = ty0 - spacing;
                }
                linkView.calculative.worldAnchors.push(source);

                linkView.calculative.worldAnchors.push({ x: sox, y: y });
                linkView.calculative.worldAnchors.push({ x: tox, y: y });
                linkView.calculative.worldAnchors.push({ x: tox, y: toy });

                linkView.calculative.worldAnchors.push(target); return;
                // return [
                //     { x: sox, y },
                //     { x: tox, y },
                //     { x: tox, y: toy }
                // ];
            }
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [{ x: sox, y: toy }];
        }
        const x = (sx0 + tox) / 2;
        if (x > sx0 - spacing && soy < ty1) {
            const y = Math.min(sy0, ty0) - spacing;
            const x = Math.max(sx1, tx1) + spacing;
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: y });
            linkView.calculative.worldAnchors.push({ x: x, y: y });
            linkView.calculative.worldAnchors.push({ x: x, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x: sox, y },
            //     { x, y },
            //     { x, y: toy }
            // ];
        }
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: sox, y: soy });
        linkView.calculative.worldAnchors.push({ x: x, y: soy });
        linkView.calculative.worldAnchors.push({ x: x, y: toy });

        linkView.calculative.worldAnchors.push(target); return;
        // return [
        //     { x: sox, y: soy },
        //     { x: x, y: soy },
        //     { x: x, y: toy }
        // ];
    } else if (sourceSide === Direction.Up && targetSide === Direction.Left) {
        console.log("s:up t:left");
        if (soy > toy) {
            if (sox > tox) {
                let y = (sy0 + toy) / 2;
                if (y > tcy && y < ty1 + spacing && sox > tx1 + spacing) {
                    y = ty0 - spacing;
                }
                linkView.calculative.worldAnchors.push(source);

                linkView.calculative.worldAnchors.push({ x: sox, y: y });
                linkView.calculative.worldAnchors.push({ x: tox, y: y });
                linkView.calculative.worldAnchors.push({ x: tox, y: toy });

                linkView.calculative.worldAnchors.push(target); return;
                // return [
                //     { x: sox, y },
                //     { x: tox, y },
                //     { x: tox, y: toy }
                // ];
            }
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [{ x: sox, y: toy }];
        }
        const x = (sx1 + tox) / 2;
        if (x < sx1 + spacing && soy < ty1) {
            const y = Math.min(sy0, ty0) - spacing;
            const x = Math.min(sx0, tx0) - spacing;
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: y });
            linkView.calculative.worldAnchors.push({ x: x, y: y });
            linkView.calculative.worldAnchors.push({ x: x, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x: sox, y },
            //     { x, y },
            //     { x, y: toy }
            // ];
        }
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: sox, y: soy });
        linkView.calculative.worldAnchors.push({ x: x, y: soy });
        linkView.calculative.worldAnchors.push({ x: x, y: toy });

        linkView.calculative.worldAnchors.push(target); return;
        // return [
        //     { x: sox, y: soy },
        //     { x: x, y: soy },
        //     { x: x, y: toy }
        // ];
    } else if (sourceSide === Direction.Bottom && targetSide === Direction.Right) {
        console.log("s:bottom t:right");
        if (soy < toy) {
            if (sox < tox) {
                let y = (sy1 + ty0) / 2;
                if (y < tcy && y > ty0 - spacing && sox < tx0 - spacing) {
                    y = ty1 + spacing;
                }
                linkView.calculative.worldAnchors.push(source);

                linkView.calculative.worldAnchors.push({ x: sox, y: y });
                linkView.calculative.worldAnchors.push({ x: tox, y: y });
                linkView.calculative.worldAnchors.push({ x: tox, y: toy });

                linkView.calculative.worldAnchors.push(target); return;
                // return [
                //     { x: sox, y },
                //     { x: tox, y },
                //     { x: tox, y: toy }
                // ];
            }
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: soy });
            linkView.calculative.worldAnchors.push({ x: sox, y: toy });
            linkView.calculative.worldAnchors.push({ x: tox, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x: sox, y: soy },
            //     { x: sox, y: toy },
            //     { x: tox, y: toy }
            // ];
        }
        const x = (sx0 + tox) / 2;
        if (x > sx0 - spacing && sy1 > toy) {
            const y = Math.max(sy1, ty1) + spacing;
            const x = Math.max(sx1, tx1) + spacing;
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: y });
            linkView.calculative.worldAnchors.push({ x: x, y: y });
            linkView.calculative.worldAnchors.push({ x: x, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x: sox, y },
            //     { x, y },
            //     { x, y: toy }
            // ];
        }
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: sox, y: soy });
        linkView.calculative.worldAnchors.push({ x: x, y: soy });
        linkView.calculative.worldAnchors.push({ x: x, y: toy });
        linkView.calculative.worldAnchors.push({ x: tox, y: toy });

        linkView.calculative.worldAnchors.push(target); return;
        // return [
        //     { x: sox, y: soy },
        //     { x: x, y: soy },
        //     { x: x, y: toy },
        //     { x: tox, y: toy }
        // ];
    } else if (sourceSide === Direction.Bottom && targetSide === Direction.Left) {
        console.log("s:bottom t:left");
        if (soy < toy) {
            if (sox > tox) {
                let y = (sy1 + ty0) / 2;
                if (y < tcy && y > ty0 - spacing && sox > tx1 + spacing) {
                    y = ty1 + spacing;
                }
                linkView.calculative.worldAnchors.push(source);

                linkView.calculative.worldAnchors.push({ x: sox, y: y });
                linkView.calculative.worldAnchors.push({ x: tox, y: y });
                linkView.calculative.worldAnchors.push({ x: tox, y: toy });

                linkView.calculative.worldAnchors.push(target); return;
                // return [
                //     { x: sox, y },
                //     { x: tox, y },
                //     { x: tox, y: toy }
                // ];
            }
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: soy });
            linkView.calculative.worldAnchors.push({ x: sox, y: toy });
            linkView.calculative.worldAnchors.push({ x: tox, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x: sox, y: soy },
            //     { x: sox, y: toy },
            //     { x: tox, y: toy }
            // ];
        }
        const x = (sx1 + tox) / 2;
        if (x < sx1 + spacing && sy1 > toy) {
            const y = Math.max(sy1, ty1) + spacing;
            const x = Math.min(sx0, tx0) - spacing;
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: y });
            linkView.calculative.worldAnchors.push({ x: x, y: y });
            linkView.calculative.worldAnchors.push({ x: x, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x: sox, y },
            //     { x, y },
            //     { x, y: toy }
            // ];
        }
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: sox, y: soy });
        linkView.calculative.worldAnchors.push({ x: x, y: soy });
        linkView.calculative.worldAnchors.push({ x: x, y: toy });
        linkView.calculative.worldAnchors.push({ x: tox, y: toy });

        linkView.calculative.worldAnchors.push(target); return;
        // return [
        //     { x: sox, y: soy },
        //     { x: x, y: soy },
        //     { x: x, y: toy },
        //     { x: tox, y: toy }
        // ];
    } else if (sourceSide === Direction.Left && targetSide === Direction.Bottom) {
        console.log("s:left t:bottom");
        if (sox > tox) {
            if (soy < toy) {
                let x = (sx0 + tx1) / 2;
                if (x > tcx && x < tx1 + spacing && soy < ty0 - spacing) {
                    x = Math.max(sx1, tx1) + spacing;
                }
                linkView.calculative.worldAnchors.push(source);

                linkView.calculative.worldAnchors.push({ x: x, y: soy });
                linkView.calculative.worldAnchors.push({ x: x, y: toy });
                linkView.calculative.worldAnchors.push({ x: tox, y: toy });

                linkView.calculative.worldAnchors.push(target); return;
                //    return [
                //         { x, y: soy },
                //         { x, y: toy },
                //         { x: tox, y: toy }
                //     ];
            }
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: tox, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [{ x: tox, y: soy }];
        }
        const y = (sy0 + ty1) / 2;
        if (y > sy0 - spacing) {
            const x = Math.min(sx0, tx0) - spacing;
            const y = Math.max(sy1, ty1) + spacing;
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: x, y: soy });
            linkView.calculative.worldAnchors.push({ x: x, y: y });
            linkView.calculative.worldAnchors.push({ x: tox, y: y });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x, y: soy },
            //     { x, y },
            //     { x: tox, y }
            // ];
        }
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: sox, y: soy });
        linkView.calculative.worldAnchors.push({ x: sox, y: y });
        linkView.calculative.worldAnchors.push({ x: tox, y: y });
        linkView.calculative.worldAnchors.push({ x: tox, y: toy });

        linkView.calculative.worldAnchors.push(target); return;
        // return [
        //     { x: sox, y: soy },
        //     { x: sox, y: y },
        //     { x: tox, y },
        //     { x: tox, y: toy }
        // ];
    } else if (sourceSide === Direction.Left && targetSide === Direction.Up) {
        console.log("s:left t:up");
        // Analogy to the left - bottom case.
        if (sox > tox) {
            if (soy > toy) {
                let x = (sx0 + tx1) / 2;
                if (x > tcx && x < tx1 + spacing && soy > ty1 + spacing) {
                    x = Math.max(sx1, tx1) + spacing;
                }
                linkView.calculative.worldAnchors.push(source);

                linkView.calculative.worldAnchors.push({ x: x, y: soy });
                linkView.calculative.worldAnchors.push({ x: x, y: toy });
                linkView.calculative.worldAnchors.push({ x: tox, y: toy });

                linkView.calculative.worldAnchors.push(target); return;
                // return [
                //     { x, y: soy },
                //     { x, y: toy },
                //     { x: tox, y: toy }
                // ];
            }
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: tox, y: soy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [{ x: tox, y: soy }];
        }
        const y = (sy1 + ty0) / 2;
        if (y < sy1 + spacing) {
            const x = Math.min(sx0, tx0) - spacing;
            const y = Math.min(sy0, ty0) - spacing;
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: x, y: soy });
            linkView.calculative.worldAnchors.push({ x: x, y: y });
            linkView.calculative.worldAnchors.push({ x: tox, y: y });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x, y: soy },
            //     { x, y },
            //     { x: tox, y }
            // ];
        }
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: sox, y: soy });
        linkView.calculative.worldAnchors.push({ x: sox, y: y });
        linkView.calculative.worldAnchors.push({ x: tox, y: y });
        linkView.calculative.worldAnchors.push({ x: tox, y: toy });

        linkView.calculative.worldAnchors.push(target); return;
        // return [
        //     { x: sox, y: soy },
        //     { x: sox, y: y },
        //     { x: tox, y },
        //     { x: tox, y: toy }
        // ];
    } else if (sourceSide === Direction.Right && targetSide === Direction.Up) {
        console.log("s:right t:up");
        // Analogy to the right - bottom case.
        if (sox < tox) {
            if (soy > toy) {
                let x = (sx1 + tx0) / 2;
                if (x < tcx && x > tx0 - spacing && soy > ty1 + spacing) {
                    x = Math.max(sx1, tx1) + spacing;
                }
                linkView.calculative.worldAnchors.push(source);

                linkView.calculative.worldAnchors.push({ x: x, y: soy });
                linkView.calculative.worldAnchors.push({ x: x, y: toy });
                linkView.calculative.worldAnchors.push({ x: tox, y: toy });

                linkView.calculative.worldAnchors.push(target); return;
                // return [
                //     { x, y: soy },
                //     { x, y: toy },
                //     { x: tox, y: toy }
                // ];
            }
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: tox, y: soy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [{ x: tox, y: soy }];
        }
        const y = (sy1 + ty0) / 2;
        if (y < sy1 + spacing) {
            const x = Math.max(sx1, tx1) + spacing;
            const y = Math.min(sy0, ty0) - spacing;
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: x, y: soy });
            linkView.calculative.worldAnchors.push({ x: x, y: y });
            linkView.calculative.worldAnchors.push({ x: tox, y: y });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x, y: soy },
            //     { x, y },
            //     { x: tox, y }
            // ];
        }
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: sox, y: soy });
        linkView.calculative.worldAnchors.push({ x: sox, y: y });
        linkView.calculative.worldAnchors.push({ x: tox, y: y });
        linkView.calculative.worldAnchors.push({ x: tox, y: toy });

        linkView.calculative.worldAnchors.push(target); return;
        // return [
        //     { x: sox, y: soy },
        //     { x: sox, y: y },
        //     { x: tox, y },
        //     { x: tox, y: toy }
        // ];
    } else if (sourceSide === Direction.Right && targetSide === Direction.Bottom) {
        console.log("s:right t:bottom");
        // Analogy to the right - top case.
        if (sox < tox) {
            if (soy < toy) {
                let x = (sx1 + tx0) / 2;
                if (x < tcx && x > tx0 - spacing && soy < ty0 - spacing) {
                    x = Math.min(sx0, tx0) - spacing;
                }
                linkView.calculative.worldAnchors.push(source);

                linkView.calculative.worldAnchors.push({ x: x, y: soy });
                linkView.calculative.worldAnchors.push({ x: x, y: toy });
                linkView.calculative.worldAnchors.push({ x: tox, y: soy });

                linkView.calculative.worldAnchors.push(target); return;
                // return [
                //     { x, y: soy },
                //     { x, y: toy },
                //     { x: tox, y: toy }
                // ];
            }
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: sox, y: soy });
            linkView.calculative.worldAnchors.push({ x: tox, y: soy });
            linkView.calculative.worldAnchors.push({ x: tox, y: toy });

            linkView.calculative.worldAnchors.push(target); return;
            // return [
            //     { x: sox, y: soy },
            //     { x: tox, y: soy },
            //     { x: tox, y: toy }
            // ];
        }
        const y = (sy0 + ty1) / 2;
        if (y > sy0 - spacing) {
            const x = Math.max(sx1, tx1) + spacing;
            const y = Math.max(sy1, ty1) + spacing;
            linkView.calculative.worldAnchors.push(source);

            linkView.calculative.worldAnchors.push({ x: x, y: soy });
            linkView.calculative.worldAnchors.push({ x: x, y: y });
            linkView.calculative.worldAnchors.push({ x: tox, y: y });

            linkView.calculative.worldAnchors.push(target); return;

            // return [
            //     { x, y: soy },
            //     { x, y },
            //     { x: tox, y }
            // ];
        }
        linkView.calculative.worldAnchors.push(source);

        linkView.calculative.worldAnchors.push({ x: sox, y: soy });
        linkView.calculative.worldAnchors.push({ x: sox, y: y });
        linkView.calculative.worldAnchors.push({ x: tox, y: y });
        linkView.calculative.worldAnchors.push({ x: tox, y: toy });

        linkView.calculative.worldAnchors.push(target); return;
        // return [
        //     { x: sox, y: soy },
        //     { x: sox, y: y },
        //     { x: tox, y },
        //     { x: tox, y: toy }
        // ];
    }
}