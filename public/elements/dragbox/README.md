xtag-dropdown
=============

This is a dropdown menu element, It is built to be easy to use and flexible.

Example:

```html
<x-dropdown id="x-dropdown" data-width="200">
    <ul>
        <li><a href="#" data-action-type="openMenu">[show menu]</a>
            <ul selected="false" orientation="" distance="">
                <li><a>1st lev - 1</a></li>
                <li><a>1st lev - 2</a></li>
                <li><a>1st lev - 3</a></li>
                <li><a>1st lev - 4</a></li>
                <li>
                    <ul>
                        <li><a href="#" data-action-type="openMenu">[show sub]</a>
                            <ul selected="false" orientation="right" distance="20">
                                <li><a>2nd lev - 1</a></li>
                                <li><a>2nd lev - 2</a></li>
                                <li><a>2nd lev - 3/a></li>
                                <li><a>2nd lev - 4</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</x-dropdown>
```


